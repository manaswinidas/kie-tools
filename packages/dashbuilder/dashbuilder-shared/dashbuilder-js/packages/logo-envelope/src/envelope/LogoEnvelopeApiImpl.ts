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

import { LogoEnvelopeContext } from "./LogoEnvelopeContext";
import { Association, LogoChannelApi, LogoEnvelopeApi, LogoInitArgs } from "../api";
import { LogoEnvelopeViewApi } from "./LogoEnvelopeView";
import { EnvelopeApiFactoryArgs } from "@kie-tooling-core/envelope";

/**
 * Implements the LogoEnvelopeApi.
 *
 * These are the methods that the Channel can call.
 */
export class LogoEnvelopeApiImpl implements LogoEnvelopeApi {
  private view: () => LogoEnvelopeViewApi;
  constructor(
    private readonly args: EnvelopeApiFactoryArgs<
      LogoEnvelopeApi,
      LogoChannelApi,
      LogoEnvelopeViewApi,
      LogoEnvelopeContext
    >
  ) {}

  /**
   * Inits the Logo View.
   *
   * Calling envelopeClient.associate is mandatory if this Envelope will send messages
   * back to the Editor (which is almost always the case).
   *
   * @param association
   * @param initArgs Initial arguments of this Envelope. The `user` object is only for example purposes.
   */
  public async logo__init(association: Association, initArgs: LogoInitArgs) {
    this.args.envelopeClient.associate(association.origin, association.envelopeServerId);
    this.view = await this.args.viewDelegate();
    this.view().setSrc(initArgs.src);
    this.view().setWidth(initArgs.width);
    this.view().setHeight(initArgs.height);
  }
}
