"use client";
import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/**
 * Blog Comments Component
 * Displays comments and allows users to add new comments.
 * Starts empty – no hard-coded sample comments.
 */
const BlogComments = ({ comments = [], postId, onAddComment }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });
    const [replyTo, setReplyTo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            id: Date.now().toString(),
            post_id: postId,
            author_name: formData.name,
            author_email: formData.email,
            content: formData.content,
            created_date: new Date().toISOString(),
            parent_id: replyTo
        };

        if (onAddComment) {
            onAddComment(newComment);
        }

        // Reset form
        setFormData({ name: '', email: '', content: '' });
        setReplyTo(null);

        alert('Kommentar wurde hinzugefügt! (In der finalen Version würde dies zum Server gesendet)');
    };

    // Group comments by parent
    const topLevelComments = comments.filter(c => !c.parent_id);
    const getReplies = (commentId) => comments.filter(c => c.parent_id === commentId);

    const CommentItem = ({ comment, isReply = false }) => (
        <div className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
            <div className="rounded-tile-sm border border-slate-200 bg-white p-4">
                {/* Author Info */}
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-black" aria-hidden="true">
                        {comment.author_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-slate-900">{comment.author_name}</h4>
                        <p className="text-xs text-slate-600">
                            {new Date(comment.created_date).toLocaleDateString('de-DE', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>

                {/* Comment Content */}
                <p className="text-slate-700 leading-relaxed mb-3">
                    {comment.content}
                </p>

                {/* Reply Button */}
                {!isReply && (
                    <button
                        type="button"
                        onClick={() => setReplyTo(comment.id)}
                        className="text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline underline-offset-2"
                    >
                        Antworten
                    </button>
                )}
            </div>

            {/* Replies */}
            {!isReply && getReplies(comment.id).map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
        </div>
    );

    return (
        <div className="glass-surface rounded-tile-md p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <MessageCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-black text-slate-900">
                    Kommentare ({comments.length})
                </h2>
            </div>

            {/* Comment Form */}
            <div className="mb-8 rounded-tile-sm border border-slate-200 bg-slate-50 p-6">
                {replyTo && (
                    <div className="mb-4 p-3 bg-orange-50 rounded-tile-sm border border-orange-200 flex items-center justify-between">
                        <span className="text-sm text-slate-800">
                            Antwort auf {comments.find(c => c.id === replyTo)?.author_name}
                        </span>
                        <button
                            type="button"
                            onClick={() => setReplyTo(null)}
                            className="text-sm font-bold text-slate-700 hover:text-orange-600"
                        >
                            Abbrechen
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="comment-name" className="block text-sm font-bold text-slate-900 mb-2">
                                Name *
                            </label>
                            <Input
                                id="comment-name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ihr Name"
                                className="h-10"
                            />
                        </div>
                        <div>
                            <label htmlFor="comment-email" className="block text-sm font-bold text-slate-900 mb-2">
                                E-Mail * (wird nicht veröffentlicht)
                            </label>
                            <Input
                                id="comment-email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="ihre.email@beispiel.de"
                                className="h-10"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="comment-content" className="block text-sm font-bold text-slate-900 mb-2">
                            Kommentar *
                        </label>
                        <Textarea
                            id="comment-content"
                            required
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Schreiben Sie Ihren Kommentar..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary min-h-[44px] px-6 py-3 text-xs"
                    >
                        <Send className="w-4 h-4" />
                        Kommentar absenden
                    </button>
                </form>
            </div>

            {/* Comments List */}
            <div>
                {comments.length === 0 ? (
                    <p className="text-center text-slate-600 py-8">
                        Noch keine Kommentare. Seien Sie der Erste!
                    </p>
                ) : (
                    <div>
                        {topLevelComments.map(comment => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogComments;
