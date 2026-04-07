\# Vulcan Guard



Intent-Aware Authorization for AI Agents



\## Overview



Vulcan Guard is an authorization layer that evaluates the intent of an AI agent’s request before allowing access to protected resources.



Instead of granting tokens based only on identity, it analyzes the requested action and determines whether it should be allowed, escalated, or blocked.



\## Key Features



\- Intent-aware decision engine

\- Token acquisition gating

\- Step-up authentication for medium-risk actions

\- Blocking of high-risk or over-scoped requests

\- Secure access to protected APIs



\## How It Works



User → Intent Analysis → Decision (ALLOW / STEP-UP / BLOCK) → Token → Protected API



\- ALLOW → token is issued and resource is accessed  

\- STEP-UP → requires stronger confirmation  

\- BLOCK → access is denied  



\## Important Note



This repository contains the demo interface and orchestration layer.



Some components of the semantic risk evaluation engine used in the live deployment are proprietary and are not fully disclosed.



\## Run Locally



```bash

npm install

node src/server.js

