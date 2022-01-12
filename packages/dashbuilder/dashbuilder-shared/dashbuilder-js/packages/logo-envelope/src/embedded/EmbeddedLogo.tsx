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
import { useCallback, useMemo } from "react";
import { EnvelopeServer } from "@kie-tooling-core/envelope-bus/dist/channel";
import { LogoApi, LogoChannelApi, LogoEnvelopeApi } from "../api";
import { EmbeddedEnvelopeFactory } from "@kie-tooling-core/envelope/dist/embedded";
import { ContainerType } from "@kie-tooling-core/envelope/dist/api";

export type Props = LogoChannelApi & {
  targetOrigin: string;
  envelopePath: string;
};

/**
 * Convenience component to embed a Logo View.
 *
 * This is aimed to be used mostly by Web applications. It exposes a `ref` to give control to the parent component.
 */
export const EmbeddedLogo = React.forwardRef<LogoApi, Props>((props: { targetOrigin: any; envelopePath: any; }, forwardedRef: any) => {
  /*
   * This is the pollInit parameter. Used to connect the Envelope with this instance of EnvelopeServer.
   */
  const pollInit = useCallback(
    (
      envelopeServer: EnvelopeServer<LogoChannelApi, LogoEnvelopeApi>,
      container: () => HTMLDivElement | HTMLIFrameElement
    ) => {
      return envelopeServer.envelopeApi.requests.logo__init(
        {
          origin: envelopeServer.origin,
          envelopeServerId: envelopeServer.id,
        },
        { src: "https://www.redhat.com/cms/managed-files/Logo-redhat-color-375.png" ,
          width: "400",
          height: "400"}
      );
    },
    []
  );

  /*
   * Creates an instance of EmbeddedEnvelope.
   *
   * This abstracts the EnvelopeServer creation and its lifecycle handling, allowing the EmbeddedLogo to be simpler.
   */
  const EmbeddedEnvelope = useMemo(() => {
    return EmbeddedEnvelopeFactory({
      api: props,
      origin: props.targetOrigin,
      pollInit,
      config: { containerType: ContainerType.IFRAME, envelopePath: props.envelopePath },
    });
  }, []);

  return <EmbeddedEnvelope ref={forwardedRef} />;
});
