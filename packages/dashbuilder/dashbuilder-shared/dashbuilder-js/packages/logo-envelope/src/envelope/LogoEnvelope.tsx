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

import { EnvelopeBus } from "@kie-tooling-core/envelope-bus/dist/api";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { LogoEnvelopeContext } from "./LogoEnvelopeContext";
import { LogoEnvelopeApiImpl } from "./LogoEnvelopeApiImpl";
import { LogoChannelApi, LogoEnvelopeApi } from "../api";
import { LogoEnvelopeView, LogoEnvelopeViewApi } from "./LogoEnvelopeView";
import { Envelope } from "@kie-tooling-core/envelope";

/**
 * Function that starts an Envelope application.
 *
 * @param args.container: The HTML element in which the Logo View will render
 * @param args.bus: The implementation of a `bus` that knows how to send messages to the Channel.
 *
 */
export function init(args: { container: HTMLElement; bus: EnvelopeBus }) {
  /**
   * Creates a new generic Envelope, typed with the right interfaces.
   */
  const envelope = new Envelope<
    LogoEnvelopeApi,
    LogoChannelApi,
    LogoEnvelopeViewApi,
    LogoEnvelopeContext
  >(args.bus);

  /**
   * Function that knows how to render a Logo View.
   * In this case, it's a React application, but any other framework can be used.
   *
   * Returns a Promise<() => LogoEnvelopeViewApi> that can be used in LogoEnvelopeApiImpl.
   */
  const envelopeViewDelegate = async () => {
    const ref = React.createRef<LogoEnvelopeViewApi>();
    return new Promise<() => LogoEnvelopeViewApi>((res) => {
      ReactDOM.render(<LogoEnvelopeView ref={ref} channelApi={envelope.channelApi} />, args.container, () =>
        res(() => ref.current!)
      );
    });
  };

  // Starts the Envelope application with the provided LogoEnvelopeApi implementation.
  const context: LogoEnvelopeContext = {};
  return envelope.start(envelopeViewDelegate, context, {
    create: (apiFactoryArgs: any) => new LogoEnvelopeApiImpl(apiFactoryArgs),
  });
}
