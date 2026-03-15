"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border bg-muted/50">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
          <span className="text-sm font-medium">{filename}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 gap-1"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="size-4" />
                复制
              </>
            )}
          </Button>
        </div>
      )}
      
      <div className="relative">
        {!filename && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="absolute right-2 top-2 z-10 h-8 gap-1"
          >
            {copied ? (
              <>
                <Check className="size-4" />
                已复制
              </>
            ) : (
              <>
                <Copy className="size-4" />
                复制
              </>
            )}
          </Button>
        )}
        
        <Highlight
          theme={themes.vsDark}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-4 overflow-x-auto text-sm`}
              style={{ ...style, margin: 0 }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  <span className="table-cell text-right pr-4 text-muted-foreground select-none">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
