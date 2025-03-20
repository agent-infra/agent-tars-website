
# Announcing Agent TARS App (Preview)

## Introduction

Hello everyone! We’re excited to introduce you to an friend — **Agent TARS**.  

**Agent TARS** is an open-source multimodal AI agent that offers streamlined browser operations by interpreting web pages visually. It also effortlessly integrates with command lines and file systems. For a quick overview, check out the demo video below:  

<div className="bg-gray-900 w-full h-500 rounded-lg overflow-hidden">
  <video
    autoPlay
    loop
    controls
    playsInline
    className="w-full h-full bg-gray-200">
    <source
      src="https://github.com/user-attachments/assets/5bfed86f-7201-4fe2-b33b-d93a591c35c8"
      type="video/mp4"
    />
  </video>
</div>  

You can find more examples in our [Showcase](https://agent-tars.com/showcase) page.

---

## Features

Agent TARS brings a suite of powerful features to enhance your AI-driven workflows:

- **🌐 Browser Operations:** Agent TARS leverages a sophisticated agent framework to execute complex tasks such as Deep Research and Operator functions. This enables comprehensive planning and execution of web-based operations.

- **🛠️ Comprehensive Tool Support:** The system integrates seamlessly with a variety of tools including search engines, file editing capabilities, command line interfaces, and the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) (MCP). This extensive toolset allows Agent TARS to handle intricate workflows with ease.

- **💻️ Enhanced Desktop App:** Agent TARS comes with a revamped user interface that includes displays for browsers, multimodal elements, and session management. It also features model configuration options, dialogue flow visualization, and real-time tracking of browser and search statuses.

- **🔄 Workflow Orchestration:** At its core, Agent TARS excels in connecting various GUI Agent tools. It smoothly orchestrates tasks such as searching, browsing, exploring links, and synthesizing information to produce final outputs.

- **⚙️ Developer-Friendly Framework:** For developers, Agent TARS offers a simplified integration process with UI-TARS. It also provides a flexible framework for creating custom workflows in GUI Agent projects, making it an ideal choice for those looking to extend and customize their AI-driven applications.

These features combine to make Agent TARS a powerful and versatile tool for AI-assisted browsing, research, and task execution.


---

## Quick Start

### Install  

Visit [Releases](https://github.com/bytedance/UI-TARS-desktop/releases?q=Agent+Tars&expanded=true) page to download the latest desktop package of Agent TARS.

![Github Releases](https://sf16-sg.tiktokcdn.com/obj/eden-sg/psvhouloj/images/releases.png)

Currently, Agent TARS supports only macOS, but don’t worry — support for other platforms is on the way!

---

### Configuration

When you open the app, you need to first open the lower-left corner to access the `Settings` page and  adjust the necessary settings:

Before you begin, you will need to set some necessary configuration, You can click the left-bottom button to open the `setting` page:

![setting-icon.png](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/setting-icon.jpeg)

Then you can set the model config and the search config. For model config, you can set the model provider and `API Key`:

![model-config.png](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/model-setting.jpeg)

> For Azure OpenAI, you can set more params, including `apiVersion`, `deploymentName` and `endpoint`.

### Search

For search config, you can set the search provider and api key:

![search-settings.png](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/search-setting.jpeg)

### Start Your First Journey

Now you can start your first journey in Agent TARS! You can input your first question in the input box, and then press Enter to send your question. Here is an example:

![first-journey.jpeg](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/start-journey.jpeg)

It's working!

We also support **Human In the Loop**, that means you can interact with the agent in the working process by the input box. If you want to change the direction of current agent work, you can insert your thoughts in the special input box on the top position, and then press Enter to send your thoughts. Here is an example:

![human-in-the-loop.jpeg](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/human-in-the-loop.jpeg)

### Share Your Thead

You can share your thread with others by the share button on the top menu.

There are two modes to share your thread:

- **Local Html**: Agent TARS will bundle your thread into a html file, and you can share it with others.
- **Remote Server Url**: Agent TARS will generate a url for you to share your thread with others, Agent TARS will upload the html bundle to a remote server.

#### Local Mode

You can click the share button to open the share modal, and then click the **Local Html** button to share your thread.

![local-share](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/local-share.jpeg)

#### Remote Mode

For the remote share mode, you need to set the remote server url in the share modal:

![remote-share](https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/agent-tars/remote-share.jpeg)

Then Agent TARS will post a request to the remote server to upload the html bundle, and then you can share the url with others. The specific request information is as follows:

> - Method: POST
> - Body:
>   - file: the html bundle file(type: multipart/form-data)
> - Response:
>   - data: { url: string }

Preview, share, and enjoy the awesome replay process!  

---


## What’s Next? 

This app marks the exciting first step in Agent TARS's journey, Next, we’ll share its inner workings and unique design with the community.  

Stay updated by following us on X ([@AgentTars](https://x.com/AgentTars)) and join our [Discord](https://discord.gg/NAeJMKk4) to share your experiences!


--- 

## Links

- X: https://x.com/AgentTars
- Discord: https://discord.gg/NAeJMKk4
- Showcase: https://agent-tars.com/showcase
- Github: https://github.com/bytedance/UI-TARS-desktop
