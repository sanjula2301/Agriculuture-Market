import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
}

interface CommentSectionProps {
  productId: string;
}

const CommentSection = ({ productId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Priya Fernando',
      content: 'Excellent quality vegetables! Very fresh and delivered on time. Highly recommended.',
      rating: 5,
      date: '2024-06-20'
    },
    {
      id: '2',
      author: 'Kamal Silva',
      content: 'Good quality produce. The farmer was very helpful and provided detailed information about the products.',
      rating: 4,
      date: '2024-06-18'
    }
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim() && newRating > 0) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Anonymous User',
        content: newComment,
        rating: newRating,
        date: new Date().toISOString().split('T')[0]
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setNewRating(0);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 cursor-pointer transition-colors ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
        onClick={interactive ? () => setNewRating(index + 1) : undefined}
      />
    ));
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>Reviews & Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-3">Leave a Review</h4>
          
          {/* Rating */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex items-center space-x-1">
              {renderStars(newRating, true)}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Comment
            </label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="resize-none"
              rows={3}
            />
          </div>

          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || newRating === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Review
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">
                    {comment.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                    <div className="flex items-center space-x-1">
                      {renderStars(comment.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-1">{comment.content}</p>
                  <p className="text-sm text-gray-500">{comment.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentSection;