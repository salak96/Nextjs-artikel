"use client";

import {
  DetailPostCommentForm,
  DetailPostCommentItem,
  DetailPostCommentWrapper,
  DetailPostSignInToComment,
} from "@/components/detail/post/comment";
import { CommentWithProfile } from "@/types/collection";
import React from "react";
import { v4 } from "uuid";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface DetailPostCommentProps {
  postId: string;
  comments: CommentWithProfile[];
}

const DetailPostComment: React.FC<DetailPostCommentProps> = ({
  postId = "",
  comments = [],
}) => {
  const [userId, setUserId] = React.useState<string | null>(null);
  React.useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUserId(data?.user?.id || null))
      .catch(() => setUserId(null));
  }, []);
  return (
    <DetailPostCommentWrapper>
      {userId ? (
        <DetailPostCommentForm postId={postId} userId={userId} />
      ) : (
        <DetailPostSignInToComment />
      )}
      <div className="py-5">
        {comments?.map((comment) => (
          <DetailPostCommentItem
            key={v4()}
            id={comment.id.toString()}
            name={comment.username as string}
            image={comment.image as string}
            comment={comment.comment as string}
            date={comment.createdAt as unknown as string}
            userId={comment.userId || ""}
          />
        ))}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostComment;