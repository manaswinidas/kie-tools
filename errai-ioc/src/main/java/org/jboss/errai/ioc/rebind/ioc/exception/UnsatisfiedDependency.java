/*
 * Copyright 2011 JBoss, by Red Hat, Inc
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

package org.jboss.errai.ioc.rebind.ioc.exception;

import org.jboss.errai.codegen.framework.meta.MetaClass;

/**
 * @author Christian Sadilek <csadilek@redhat.com>
 */
public abstract class UnsatisfiedDependency {
  private MetaClass enclosingType;
  protected MetaClass injectedType;
  protected String message = "";
  
  public UnsatisfiedDependency(MetaClass enclosingType, MetaClass injectedType) {
    this.enclosingType = enclosingType;
    this.injectedType = injectedType;
  }

  protected UnsatisfiedDependency(MetaClass enclosingType, MetaClass injectedType, String message) {
    this.enclosingType = enclosingType;
    this.injectedType = injectedType;
    this.message = message;
  }

  @Override
  public String toString() {
    StringBuilder sbuf = new StringBuilder();
    sbuf.append(" @> ").append(enclosingType.getFullyQualifiedName()).append("\n");
    return sbuf.toString();
  }

  public MetaClass getEnclosingType() {
    return enclosingType;
  }

  public MetaClass getInjectedType() {
    return injectedType;
  }
}