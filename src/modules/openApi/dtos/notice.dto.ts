import { IsEnum, IsNotEmpty } from 'class-validator';

export enum noticeType {
  QMSG = 'qmsg',
  SERVER_CHAIN = 'serverchain',
  PUSH_PLUS = 'pushplus',
  PUSH_PLUS_HXTRIP = 'pushplushxtrip',
  DING_TALK = 'dingtalk',
  WECOM = 'wecom',
  BARK = 'bark',
  GO_CQHTTP = 'gocqhttp',
  PUSH_DEER = 'pushdeer',
  IGOT = 'igot',
  TELEGRAM = 'telegram',
}

export interface NoticeParamsType {
  /**
   * 字符串，平台名称的缩写，
   */
  type: noticeType;
  /**
   * 平台用户身份标识，通常情况下是一串数字和字母组合，部分平台（如 gocqhttp）见下方详细说明
   */
  token: string;
  /**
   * 可选，消息标题，如果推送平台不支持消息标题，则会拼接在正文首行
   */
  title?: string;
  /**
   * Markdown 格式的推送内容，如果推送平台不支持 Markdown，pushoo 会自动转换成支持的格式
   */
  content: string;
}

export class NoticeParamsDto {
  /**
   * 字符串，平台名称的缩写，
   */
  @IsEnum(noticeType, { message: '类型参考:https://www.npmjs.com/pushoo' })
  type: noticeType;
  /**
   * 平台用户身份标识，通常情况下是一串数字和字母组合，部分平台（如 gocqhttp）见下方详细说明
   */
  @IsNotEmpty({ message: '请传入发送token' })
  token: string;
  /**
   * 可选，消息标题，如果推送平台不支持消息标题，则会拼接在正文首行
   */
  title?: string;
  /**
   * Markdown 格式的推送内容，如果推送平台不支持 Markdown，pushoo 会自动转换成支持的格式
   */
  @IsNotEmpty({ message: '请传入发送消息' })
  content: string;
}

export class NoticeGetParamsDto extends NoticeParamsDto {}
export class NoticePostParamsDto extends NoticeParamsDto {}
