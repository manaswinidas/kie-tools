/*
 * Copyright 2011 JBoss, a divison Red Hat, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.jboss.errai.ioc.rebind.ioc.codegen.builder.callstack;

import org.jboss.errai.ioc.rebind.ioc.codegen.Context;
import org.jboss.errai.ioc.rebind.ioc.codegen.Statement;
import org.jboss.errai.ioc.rebind.ioc.codegen.Variable;

/**
 * @author Mike Brock <cbrock@redhat.com>
 */
public class DeclareVariable extends AbstractCallElement {
  private Variable variable;

  public DeclareVariable(Variable variable) {
    this.variable = variable;
  }

  public void handleCall(CallWriter writer, Context context, Statement statement) {
    context.addVariable(variable);
    writer.append(variable.generate(context));
    nextOrReturn(writer, context, null);
  }
}
