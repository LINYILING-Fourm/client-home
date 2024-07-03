// 判断给定的用户名是否有效，有效条件是用户名在指定的列表中（'admin' 或 'editor'）
export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0;

// 判断给定的路径是否为外部链接（http、https、mailto 或 tel 开头）
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);
