export declare enum noticeType {
    QMSG = "qmsg",
    SERVER_CHAIN = "serverchain",
    PUSH_PLUS = "pushplus",
    PUSH_PLUS_HXTRIP = "pushplushxtrip",
    DING_TALK = "dingtalk",
    WECOM = "wecom",
    BARK = "bark",
    GO_CQHTTP = "gocqhttp",
    PUSH_DEER = "pushdeer",
    IGOT = "igot",
    TELEGRAM = "telegram"
}
export interface NoticeParamsType {
    type: noticeType;
    token: string;
    title?: string;
    content: string;
}
export declare class NoticeParamsDto {
    type: noticeType;
    token: string;
    title?: string;
    content: string;
}
export declare class NoticeGetParamsDto extends NoticeParamsDto {
}
export declare class NoticePostParamsDto extends NoticeParamsDto {
}
