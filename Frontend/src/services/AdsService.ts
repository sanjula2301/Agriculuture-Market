import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

// Ad interface
export interface Ad {
  id?: string;
  title: string;
  adType: string;
  price: number;
  negotiable: boolean;
  salePrice?: number | null;
  currency: string;
  condition: string;
  description: string;
  category: string;
  useProfileAddress: boolean;
  useProfileContact: boolean;
  imageUrls: string[];
  phone?: string | null;
  location?: string;
  preciseLocation?: string;
  createdAt?: Timestamp | Date;
  ownerId: string; // link to user
}

// Type for adding ad
export type AdData = Omit<Ad, "id" | "ownerId" | "createdAt">;

export class AdsService {
  private adsCollection() {
    return collection(db, "ads"); // ✅ top-level ads collection
  }

  async addAd(ad: AdData, ownerId: string): Promise<string> {
    const docRef = await addDoc(this.adsCollection(), {
      ...ad,
      ownerId,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  }

  async getAllAds(): Promise<Ad[]> {
    const q = query(this.adsCollection(), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Ad[];
  }

  async getAdById(adId: string): Promise<Ad | null> {
    const adRef = doc(this.adsCollection(), adId);
    const adSnap = await getDoc(adRef);

    if (!adSnap.exists()) return null;
    return { id: adSnap.id, ...adSnap.data() } as Ad;
  }
  async getUserById(uid: string): Promise<{ displayName: string | null }> {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();
      return { displayName: data.displayName || null };
    }
    return { displayName: null };
  }
}
