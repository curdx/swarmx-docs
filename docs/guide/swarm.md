# 蜂群协作

蜂群协作是 swarmx 的默认玩法：你只跟一个常驻的**队长**打交道，它按任务规模伸缩团队。

<div class="tip custom-block" style="padding:8px 16px;">

跟队长说需求，它自己决定是直接做，还是拆开派几个 worker——不预先画流程图，按任务临时派
（Magentic-One 那套）。

</div>

![用自然语言跟队长对话](/assets/screenshot-orchestrator-chat.png)

## 成员之间怎么协作

- **共享收件箱**：agent 之间用 id 互相寻址（`swarm_send_message`），消息在对方下一个
  回合边界投递——不轮询。
- **共享黑板**：一块带全文检索、版本历史、写入即推送的 markdown KV 存储。约定见
  [交接协议](/reference/handoff-protocol)。
- **推式唤醒**：黑板某个 key 一被写，所有在等它的 agent 当场被唤醒，包括已经停下发呆的
  那些——无轮询、无死锁。

## 看得见的协作

「协作图」把成员之间的依赖与等待画成实时的图，「工作台账」显示任务进度与共享区状态。

![蜂群的实时依赖协作图](/assets/screenshot-dag.png)

一个真实的例子：让队长「创建两个文件，各派一个 worker 去做」，你会看到队长上线、派出
两个 worker（可以是不同引擎，比如 claude 队长 + codex worker）、它们各自完成后向你汇报。
