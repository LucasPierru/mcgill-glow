import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import OrderedList from "@tiptap/extension-ordered-list";
import "@/styles/editor.css";

const PostContent = ({ content }: { content: string }) => {
  return (
    <div
      className="lg:prose-md prose"
      dangerouslySetInnerHTML={{
        __html:
          generateHTML(JSON.parse(content), [Document, Paragraph, Text, Bold, Heading, ListItem, Image, OrderedList]) ||
          "",
      }}
    />
  );
};

export default PostContent;
