#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Memory Bank CLI Tool
 * Copies custom_modes and .cursor folders to the current working directory
 */

// Parse command line arguments
const command = process.argv[2];

// Get the source paths (relative to this script's location)
const scriptDir = __dirname;
const projectRoot = path.resolve(scriptDir, '..');
const sourceCursor = path.join(projectRoot, 'templates', 'cursor-memory-bank', '.cursor');

// Get the target path (current working directory)
const targetDir = process.cwd();
const targetCursor = path.join(targetDir, '.cursor');

/**
 * Copy directory recursively
 */
async function copyDirectory(source, target, name) {
  try {
    // Check if source exists
    if (!await fs.pathExists(source)) {
      console.error(chalk.red(`❌ 错误: 源目录不存在: ${source}`));
      process.exit(1);
    }

    // Check if target already exists
    if (await fs.pathExists(target)) {
      console.warn(chalk.yellow(`⚠️  警告: 目标目录已存在: ${target}`));
      console.warn(chalk.yellow(`   将覆盖现有文件...`));
    }

    // Copy directory
    await fs.copy(source, target, {
      overwrite: true,
      errorOnExist: false
    });

    console.log(chalk.green(`✓ 成功复制 ${name} 到 ${target}`));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ 复制 ${name} 时出错:`));
    console.error(chalk.red(`   ${error.message}`));
    return false;
  }
}

/**
 * Initialize Memory Bank
 */
async function initMemoryBank() {
  console.log(chalk.blue('\n📦 Memory Bank CLI - 开始复制文件...\n'));

  // Display paths
  console.log(chalk.gray(`源目录:`));
  console.log(chalk.gray(`  .cursor: ${sourceCursor}`));
  console.log(chalk.gray(`\n目标目录: ${targetDir}\n`));

  // Copy .cursor
  const cursorSuccess = await copyDirectory(
    sourceCursor,
    targetCursor,
    '.cursor'
  );

  // Summary
  console.log(chalk.blue('\n' + '='.repeat(50)));
  if (cursorSuccess) {
    console.log(chalk.green('✅ 所有文件复制完成！\n'));
    console.log(chalk.gray(`已复制到: ${targetDir}`));
    console.log(chalk.gray(`  - custom_modes/`));
    console.log(chalk.gray(`  - .cursor/\n`));
    process.exit(0);
  } else {
    console.log(chalk.red('❌ 部分文件复制失败\n'));
    process.exit(1);
  }
}

/**
 * Show help message
 */
function showHelp() {
  console.log(chalk.blue('\n📦 Memory Bank CLI\n'));
  console.log(chalk.gray('使用方法:'));
  console.log(chalk.white('  bl-cli init-memory-bank   初始化 Memory Bank（.cursor 文件夹）\n'));
  console.log(chalk.gray('示例:'));
  console.log(chalk.white('  bl-cli init-memory-bank\n'));
}

/**
 * Main function
 */
async function main() {
  // Check command
  if (!command || command === '--help' || command === '-h') {
    showHelp();
    process.exit(0);
  }

  if (command === 'init-memory-bank') {
    await initMemoryBank();
  } else {
    console.error(chalk.red(`❌ 未知命令: ${command}\n`));
    showHelp();
    process.exit(1);
  }
}

// Run main function
main().catch(error => {
  console.error(chalk.red('\n❌ 发生未预期的错误:'));
  console.error(chalk.red(error.message));
  process.exit(1);
});

