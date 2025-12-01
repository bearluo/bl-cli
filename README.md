# bl-cli

Memory Bank CLI 工具，用于将 `custom_modes` 和 `.cursor` 文件夹复制到当前工作目录。

## 安装

```bash
npm install
npm link  # 全局链接，使 bl-cli 命令可用
```

## 使用方法

在目标项目目录中运行：

```bash
bl-cli init-memory-bank
```

该命令会将以下文件夹复制到当前工作目录：
- `custom_modes/` - 从 `templates/cursor-memory-bank/custom_modes/`
- `.cursor/` - 从 `templates/cursor-memory-bank/.cursor/`

### 帮助信息

```bash
bl-cli --help
# 或
bl-cli -h
```

## 功能特性

- ✅ 递归复制目录结构
- ✅ 跨平台支持（Windows/Mac/Linux）
- ✅ 友好的命令行输出
- ✅ 错误处理和提示
- ✅ 自动覆盖已存在的文件

## 开发

```bash
# 安装依赖
npm install

# 测试（在另一个目录中）
cd /path/to/test/directory
node /path/to/bl-cli/bin/bl-cli.js init-memory-bank
```

## 许可证

ISC

