export const authorName = "佐比麦";

export type CppTopic = {
  number: string;
  title: string;
  focus: string;
  clientUse: string;
};

export type CppStage = {
  id: string;
  label: string;
  title: string;
  note: string;
  topics: CppTopic[];
};

export type FeaturedProject = {
  name: string;
  title: string;
  summary: string;
  description: string;
  videoFile: string;
  posterFile: string;
  duration: string;
  resolution: string;
  facts: Array<{ label: string; value: string }>;
};

export const featuredProject: FeaturedProject = {
  name: "GoGoGhost",
  title: "第三人称动作生存游戏 Demo",
  summary: "面向游戏客户端岗位整理的第三人称动作生存 Demo，集中展示当前可玩的战斗流程、武器与成长反馈，以及 HUD 和菜单交互效果。",
  description: "这是我持续开发与打磨的 Unity 个人项目。它承载了角色战斗、敌人波次、武器系统、能力成长、界面框架与存档流程等游戏客户端实践，也用于展示我把功能串成完整体验的能力。",
  videoFile: "gogoghost-demo.mp4",
  posterFile: "gogoghost-poster.jpg",
  duration: "02:35",
  resolution: "720P WEB",
  facts: [
    { label: "ROLE", value: "独立开发" },
    { label: "ENGINE", value: "Unity" },
    { label: "LANGUAGE", value: "C#" },
    { label: "FOCUS", value: "游戏客户端" },
  ],
};

export const cppStages: CppStage[] = [
  {
    id: "ownership",
    label: "STAGE 01",
    title: "对象与资源管理",
    note: "先把生命周期和所有权学扎实，才能安全地管理纹理、文件、句柄与场景对象。",
    topics: [
      { number: "01", title: "对象生命周期", focus: "初始化方式、存储期、构造与析构顺序", clientUse: "判断场景对象、组件和资源句柄何时创建与释放" },
      { number: "02", title: "拷贝构造、拷贝赋值、析构", focus: "Rule of Three、Five 与 Zero", clientUse: "正确封装纹理、缓冲区等不可随意复制的资源" },
      { number: "03", title: "左值、右值、移动语义", focus: "值类别、std::move 与资源转移", clientUse: "把临时帧数据和加载结果低成本送入队列" },
      { number: "04", title: "RAII 和所有权", focus: "用对象生命周期自动管理资源", clientUse: "封装文件、锁、Socket 和图形 API 句柄" },
      { number: "05", title: "智能指针", focus: "unique_ptr、shared_ptr、weak_ptr", clientUse: "区分实体拥有关系与事件系统中的弱观察关系" },
    ],
  },
  {
    id: "object-model",
    label: "STAGE 02",
    title: "对象模型与回调",
    note: "理解动态派发、对象布局与回调成本，构建清晰而不过度抽象的客户端接口。",
    topics: [
      { number: "06", title: "继承、多态、虚析构", focus: "动态派发与多态删除", clientUse: "设计可安全扩展的组件、渲染对象和状态接口" },
      { number: "07", title: "虚表、多继承与对象布局", focus: "虚指针、基类子对象与指针调整", clientUse: "理解引擎 ABI、序列化与对象尺寸成本" },
      { number: "08", title: "Lambda、函数对象、std::function", focus: "捕获、类型擦除与调用开销", clientUse: "实现输入回调、事件总线和异步任务完成通知" },
    ],
  },
  {
    id: "generic",
    label: "STAGE 03",
    title: "STL 与泛型编程",
    note: "选择合适的数据结构，并用现代 C++ 把可复用能力放进编译期约束中。",
    topics: [
      { number: "09", title: "STL 容器与迭代器失效", focus: "容器结构、复杂度与失效规则", clientUse: "为 ECS、场景树和热路径数据选择合适存储" },
      { number: "10", title: "泛型算法与迭代器体系", focus: "算法、容器与迭代器能力", clientUse: "整理资源列表、实体筛选和数据转换流程" },
      { number: "11", title: "模板推导、特化、可变参数", focus: "模板推导、偏特化与折叠表达式", clientUse: "构建组件系统、数学类型和通用消息分发" },
      { number: "12", title: "类型萃取、SFINAE、Concepts", focus: "编译期类型信息与接口约束", clientUse: "让渲染与资源接口在编译期暴露错误" },
      { number: "13", title: "引用折叠与完美转发", focus: "转发引用和 std::forward", clientUse: "工厂创建组件时保留参数值类别并减少拷贝" },
    ],
  },
  {
    id: "toolchain",
    label: "STAGE 04",
    title: "构建与底层语义",
    note: "从异常保证一路下潜到链接和内存布局，掌握客户端工程最常见的底层边界。",
    topics: [
      { number: "14", title: "异常安全与 noexcept", focus: "基本、强与不抛异常保证", clientUse: "保护帧循环稳定性，并理解容器扩容时的移动选择" },
      { number: "15", title: "编译、链接、ODR、动态库", focus: "从源码到可执行文件的完整链路", clientUse: "拆分引擎模块、插件和平台动态库" },
      { number: "16", title: "内存布局、对齐与未定义行为", focus: "padding、悬垂引用、越界与严格别名", clientUse: "对齐 GPU 缓冲区和网络数据，并用 Sanitizer 查错" },
    ],
  },
  {
    id: "performance",
    label: "STAGE 05",
    title: "并发与性能",
    note: "性能优化从证据出发：先理解同步与缓存，再讨论任务系统、对象池和无锁结构。",
    topics: [
      { number: "17", title: "多线程、锁、条件变量", focus: "线程同步、临界区与谓词等待", clientUse: "实现资源异步加载、任务系统和线程安全队列" },
      { number: "18", title: "原子操作与 C++ 内存模型", focus: "data race、happens-before 与 memory order", clientUse: "处理渲染/逻辑线程间的状态同步和轻量队列" },
      { number: "19", title: "CPU 缓存、对象池、内存池", focus: "局部性、false sharing 与分配开销", clientUse: "稳定帧时间，降低高频实体与粒子分配成本" },
    ],
  },
  {
    id: "architecture",
    label: "STAGE 06",
    title: "工程设计",
    note: "把模式当成依赖与生命周期的语言，而不是需要背诵的类图。",
    topics: [
      { number: "20", title: "工程设计与设计模式", focus: "策略、观察者、工厂、RAII Guard 与 PImpl", clientUse: "拆分渲染后端、输入系统、游戏状态和平台层边界" },
    ],
  },
];
