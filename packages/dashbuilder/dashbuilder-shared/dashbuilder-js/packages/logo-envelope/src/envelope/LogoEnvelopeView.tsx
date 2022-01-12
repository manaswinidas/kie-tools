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

import { MessageBusClientApi } from "@kie-tooling-core/envelope-bus/dist/api";
import * as React from "react";
import { useCallback, useImperativeHandle, useMemo, useState } from "react";
import { LogoChannelApi } from "../api";
import "./styles.scss";

export interface LogoEnvelopeViewApi {
  setSrc(src: string): void;
  setWidth(width: string): void;
  setHeight(height: string): void;
}

interface Props {
  channelApi: MessageBusClientApi<LogoChannelApi>;
}

/**
 * The actual implementation of the Logo View.
 * In this case, it's a React component. See LogoEnvelope.tsx.
 *
 * Provides an imperative handle to give control of this component to its containing components.
 */
export const LogoEnvelopeView = React.forwardRef<LogoEnvelopeViewApi, Props>((props: any, forwardedRef: any) => {
  const [src, setSrc] = useState<string | undefined>();
  const [width, setWidth] = useState<string | undefined>();
  const [height, setHeight] = useState<string | undefined>();

  useImperativeHandle(
    forwardedRef,
    () => ({
      setSrc,
      setWidth,
      setHeight,
    }),
  );


  return (
    <img src={src} style={{ width: width, height: height}} />
  );
});
