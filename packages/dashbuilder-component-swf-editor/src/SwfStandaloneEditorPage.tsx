/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { useEffect, useRef } from "react";
import { Page } from "@patternfly/react-core";
import * as SwfEditor from "@kie-tools/serverless-workflow-standalone-editor/dist/swf";

export interface SwfEditorProps {
  yamlContent: string;
  containsId?: boolean;
  blur?: number;
  opacity?: number;
  maxOpacity?: number;
  sizeFactor?: number;
  width?: string;
  height?: string;
}

export function SwfStandaloneEditorPage(props: SwfEditorProps) {
  const swfEditorContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = SwfEditor.open({
      container: swfEditorContainer.current!,
      initialContent: Promise.resolve(""),
      readOnly: true,
    });
  }, []);

  return (
    <Page>
      <div style={{ height: "40px", padding: "5px" }}></div>
      <div ref={swfEditorContainer} style={{ height: "calc(100% - 50px)" }} />
    </Page>
  );
}
