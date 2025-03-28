# Trouble Shooting

Starting from [v0.0.1-alpha.4](https://github.com/bytedance/UI-TARS-desktop/releases/tag/Agent-TARS-v1.0.0-alpha.4), we have introduced log-based error troubleshooting capabilities.  

## Introduction

Considering that the current Agent TARS App is still in the `preview` stage, coupled with the serving instability of LLM providers, you may encounter various unexpected runtime failures. When encountering such issues, conducting self-troubleshooting to a certain extent might help you resolve the problem more quickly.

If you complete the guide in this section and find that the program still does not work, or encounter error scenarios not covered in this document, please [report the issue](https://github.com/bytedance/UI-TARS-desktop/issues) to us and provide the minimal steps to reproduce the problem.  


## Overview

| No. | Scenario                  | Solution Approach                                  |
| ------------ | ------------------------- | ------------------------------------------------- |
|  #1          | No response               | Use [Inspect Main Process](#inspect-main-process) to search for `[Error]` to determine if the LLM encountered an request error. |
|  #2          | Validate whether OpenAI API Key is effective | Refer to [Validate OpenAI API Key](#validate-openai-api-key).            |
|  #3          | Validate whether Anthropic API Key is effective | Refer to [Validate Anthropic API Key](#validate-anthropic-api-key).      |


## Guide

### Inspect Main Process

Open the top left menu, navigate to `Help > View Logs`:

<p align="center">
  <img width="300" src="https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars-docs/view-logs.png">
</p>

You will see the complete logs of the Main thread:

<p align="center">
  <img width="600" src="https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars-docs/logs-window.png">
</p>

By filtering `[Error]`, you can locate all potential runtime errors in typical scenarios.


### Inspect WebView Process

If you encounter abnormal UI rendering, you can launch Chrome DevTools using the following steps:  

<p align="center">
  <img width="300" src="https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars-docs/toggle-developer-tools.png">
</p>

You will be able to debug the UI and check the console for any error logs:  

<p align="center">
  <img width="600" src="https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/agent-tars-docs/chrome-devtools.png">
</p>


### Validate LLM Request

#### Validate Anthropic API Key

If you are using the Official Anthropic API Key, you can check whether the current API Key is valid by entering the following Curl command in the terminal:  

```bash
curl https://api.anthropic.com/v1/messages \
--header "x-api-key: $ANTHROPIC_API_KEY" \
--header "anthropic-version: 2023-06-01" \
--header "content-type: application/json" \
--data \
'{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, world"}
    ]
}'
```

If you can successfully make a request, it means there is no problem with your API Key.

> **See more**: https://docs.anthropic.com/en/api/getting-started

---

#### Validate OpenAI API Key

If you are using the Official OpenAI API Key, you can check whether the current API Key is valid by entering the following Curl command in the terminal:  

```bash
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": "Hello, world."
            }
        ]
    }'
```

If you can successfully make a request, it means there is no problem with your API Key.

> **See more**: https://platform.openai.com/docs/quickstart

---

### Validate Search

#### Validate Traily

```bash
curl -X POST https://api.tavily.com/search \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer tvly-dev-********************************' \
-d '{
    "query": "Agent TARS"
}'
```

## Errors

### Claude

#### 403: Request not allowed

```bash
Failed to get tool response from LLM: Failed to get tool response
from Anthropic:Error:403 {"error":{"type": "feorbidden","message": "Request not allowed"}}
```

**Solution**：[Validate Anthropic API Key](#validate-anthropic-api-key)。


### OpenAI

#### 401 Incorrect API key provided

```bash
[2025-03-22T18:05:59.707Z] [ERROR] Failed to get tool response from LLM: Failed to get tool response from OpenAI: Error: 401 Incorrect API key provided: xx. You can find your API key at https://platform.openai.com/account/api-keys.
```

**Solution**：[Validate OpenAI API Key](#validate-openai-api-key)。

---

#### TypeError: Invalid URL

```bash
[2025-03-22T17:14:02.078Z] [ERROR] Failed to get tool response from LLM: Failed to get tool response from OpenAI: TypeError: Invalid URL
```

**Solution**：Replace the `https://api.openai.com/v1` in [Validate OpenAI API Key](#validate-openai-api-key) for requests and ensure the Base URL (Endpoint) is configured correctly.  


---

#### Error: 400 invalid model or product name

```bash
Failed to get tool response from LLM: Failed to get tool response from OpenAI: Error: 400 invalid model or product name, product not right
```  

---

#### Error: 401 no model permission:

```bash
Failed to get tool response from LLM: Failed to get tool response from Azure OpenAI: Error: 401 no model permission: gpt-4o-2024-11-20, you can apply on the platform
```

---

### DeepSeek

#### 402 Insufficient Balance

```bash
[2025-03-23T04:01:26.836Z] [ERROR] Failed to get tool response from LLM: Failed to get tool response from OpenAI: Error: 402 Insufficient Balance
```

Solution: Recharge.  



