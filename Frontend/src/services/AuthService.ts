import { auth, googleProvider, db } from '@/firebase/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const SESSION_TIMEOUT = 30 * 60 * 1000; 

export class AuthService {
  private sessionTimer: NodeJS.Timeout | null = null;

  constructor() {}

  async register(username: string, email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (username) {
      await updateProfile(userCredential.user, { displayName: username });
    }

    // Store user in Firestore
    await this.saveUserData(userCredential.user);

    const token = await userCredential.user.getIdToken();
    this.startSessionTimer();
    return token;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Check if user exists in Firestore, create if not
    await this.saveUserData(userCredential.user);

    const token = await userCredential.user.getIdToken();
    this.startSessionTimer();
    return token;
  }

  async registerWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider);

    // Store user in Firestore
    await this.saveUserData(userCredential.user);

    const token = await userCredential.user.getIdToken();
    this.startSessionTimer();
    return token;
  }
  
  async loginWithGoogle() { 
    const userCredential = await signInWithPopup(auth, googleProvider); 
    
    // Ensure user is in Firestore
    await this.saveUserData(userCredential.user);

    const token = await userCredential.user.getIdToken(); 
    this.startSessionTimer(); 
    return token; 
  }

  async logout() {
    this.clearSessionTimer();
    localStorage.removeItem('sessionStart');
    await signOut(auth);
  }

  onAuthChange(callback: (user: any) => void) {
    return onAuthStateChanged(auth, callback);
  }

  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  private startSessionTimer() {
    this.clearSessionTimer();
    localStorage.setItem('sessionStart', Date.now().toString());
    this.sessionTimer = setTimeout(() => this.autoLogout(), SESSION_TIMEOUT);
  }

  subscribeAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  private clearSessionTimer() {
    if (this.sessionTimer) clearTimeout(this.sessionTimer);
  }

  private async autoLogout() {
    await this.logout();
    alert("Session expired. You have been logged out.");
  }

  // 🔥 Save user to Firestore
  private async saveUserData(user: User) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
    }
  }
}

