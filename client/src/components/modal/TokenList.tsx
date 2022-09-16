import React, { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Token } from "./Token";
import { IToken } from "../../models/models";
import { useActions } from "../../hooks/useActions";

interface ITokenList {
  tokens: IToken[];
  onClose: React.Dispatch<any>;
}

export const TokenList = ({ tokens, onClose }: ITokenList) => {
  //console.log(tokens);
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: tokens?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 75,
    overscan: 5,
  });

  return (
    <div
      style={{
        height: `400px`,
        overflow: "auto",
      }}
      ref={parentRef}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const token = tokens[virtualItem.index];

          return (
            <Token token={token} virtualItem={virtualItem} onClose={onClose} />
          );
        })}
      </div>
    </div>
  );
};
