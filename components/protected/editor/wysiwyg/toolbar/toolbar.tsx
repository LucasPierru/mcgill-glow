import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/core";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  PilcrowIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  HighlighterIcon,
} from "lucide-react";

const Toolbar = ({ editor }: { editor: Editor }) => {
  return (
    <div className="px-12 pt-12">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive({ textAlign: "left" }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}>
          <AlignLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive({ textAlign: "center" }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}>
          <AlignCenterIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive({ textAlign: "right" }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}>
          <AlignRightIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive({ textAlign: "justify" }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}>
          <AlignJustifyIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          type="button"
          size="sm"
          variant={editor?.isActive("paragraph") ? "default" : "outline"}>
          <PilcrowIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type="button"
          size="sm"
          variant={editor?.isActive("bold") ? "default" : "outline"}>
          <BoldIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type="button"
          size="sm"
          variant={editor?.isActive("italic") ? "default" : "outline"}>
          <ItalicIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type="button"
          size="sm"
          variant={editor?.isActive("strike") ? "default" : "outline"}>
          <StrikethroughIcon className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          type="button"
          size="sm"
          variant={editor?.isActive("highlight") ? "default" : "outline"}>
          <HighlighterIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("heading", { level: 1 }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1Icon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("heading", { level: 2 }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2Icon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor?.isActive("heading", { level: 3 }) ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
