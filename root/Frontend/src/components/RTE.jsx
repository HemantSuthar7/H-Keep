import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from "../conf/conf.js";

export default function RTE({ name, control, label, defaultValue = "Hello" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tiny_mce_api_key}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: `
                body {
                  background-color: #1E1E1E;
                  color: white;
                  font-family:Helvetica,Arial,sans-serif;
                  font-size:14px;
                }
                a { color: #9A9A9A; }
                .mce-content-body { color: white; }
              `,
              skin: "oxide-dark", // Use the built-in dark skin
              content_css: "dark", // Apply dark styles to the content area
              setup: (editor) => {
                editor.on('init', () => {
                  editor.setContent(defaultValue);
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
