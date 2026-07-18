import React, { FC } from "react";

interface DetailPostCommentWrapperProps {
  children?: React.ReactNode;
}

const DetailPostCommentWrapper: FC<DetailPostCommentWrapperProps> = ({
  children,
}) => {
  return (
    <div
      id="comments"
      className="mx-auto my-5 rounded-xl border border-border bg-card p-6 text-card-foreground"
    >
      <div>{children}</div>
    </div>
  );
};

export default DetailPostCommentWrapper;
