import { ReactElement, useMemo, useEffect, useRef } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubLight } from "@uiw/codemirror-theme-github";
import { languageExtensionMappings } from "./constants/language-extension-mappings";
import { openSearchPanel } from "@codemirror/search";

interface Props {
  content: string;
  fileName: string;
  onChange: (value: string) => void;
}

export const Editor = ({ fileName, content, onChange }: Props): ReactElement => {
  const editorApi = useRef<ReactCodeMirrorRef>(null);

  const language = useMemo(() => {
    const fileExt = fileName.split(".").pop() as keyof typeof languageExtensionMappings;

    if (fileExt && languageExtensionMappings[fileExt]) {
      const language = languageExtensionMappings[fileExt];

      return langs[language];
    }
  }, [fileName]);

  useEffect(() => {
    setTimeout(() => {
      if (editorApi.current?.view) openSearchPanel(editorApi.current?.view);
    }, 500);
  }, []);

  return (
    <CodeMirror
      ref={editorApi}
      value={content}
      autoFocus
      height="calc(100vh - 170px)"
      basicSetup={true}
      theme={githubLight}
      onChange={onChange}
      extensions={language ? [language()] : []}
    />
  );
};
