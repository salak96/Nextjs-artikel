import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import React from "react";
import DetailPostCommentDeleteButton from "./detail-post-comment-delete-button";

interface DetailPostCommentItemProps {
  id: string;
  name: string;
  image?: string;
  comment: string;
  date: string;
  userId: string;
}

const DetailPostCommentItem: React.FC<DetailPostCommentItemProps> = ({
  id,
  name,
  image = "",
  comment,
  date,
  userId,
}) => {
  return (
    <div className="my-4 rounded-lg border border-border bg-background p-4">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={image} alt="Avatar" />
            <AvatarFallback>
              <span className="inline-block h-full w-full overflow-hidden rounded-full bg-muted">
                <svg
                  className="h-full w-full text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-card-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{moment(date).fromNow()}</p>
        </div>
        <DetailPostCommentDeleteButton id={id} userId={userId} />
      </div>
      <Separator className="mb-3 mt-2" />
      <div
        className="prose prose-sm max-w-none text-card-foreground dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: comment }}
      />
    </div>
  );
};

export default DetailPostCommentItem;
