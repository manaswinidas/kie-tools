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
import { useEffect, useState } from "react";

import { SwfStandaloneEditorPage } from "./SwfStandaloneEditorPage";
import { ComponentController } from "@kie-tools/dashbuilder-component-api";

const YAML_PARAM = "yaml";

const MISSING_PARAM_MSG = "You must provide either a YAML URL or the YAML Content using the parameter 'yaml'.";
const INVALID_SVG_PARAM = "YAML parameter is not valid. It should be either a URL or a YAML content";

const isUrl = (param: string) => {
  return param && (param.trim().startsWith("http") || param.trim().startsWith("file:"));
};

const validateParams = (params: Map<string, string>) => {
  const yaml = params.get(YAML_PARAM);
  if (!yaml) {
    return MISSING_PARAM_MSG;
  }

  if (!isUrl(yaml)) {
    return INVALID_SVG_PARAM;
  }
};

interface AppState {
  yamlContent: string;
}

interface Props {
  controller: ComponentController;
}

export function SwfEditorComponent(props: Props) {
  const [appState, setAppState] = useState<AppState>({ yamlContent: "" });

  const onParams = (params: Map<string, any>) => {
    validateParams(params);
    props.controller.configurationOk();

    const htParams = {
      yaml: params.get(YAML_PARAM),
    };

    if (isUrl(htParams.yaml)) {
      fetch(htParams.yaml)
        .then((r) => r.text())
        .then((urlYamlContent) =>
          setAppState((previousState) => ({
            ...previousState,
            ...htParams,
            yamlContent: urlYamlContent,
          }))
        )
        .catch((e) =>
          setAppState((previousState) => ({
            ...previousState,
            yamlContent: "",
            errorMessage: e,
          }))
        );
    }
  };

  useEffect(() => props.controller.setOnParams(onParams), [appState.yamlContent]);

  return <>{<SwfStandaloneEditorPage {...appState} />};</>;
}
