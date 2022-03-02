"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IspeakTagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let IspeakTagService = class IspeakTagService {
    ispeakTagModal;
    constructor(ispeakTagModal) {
        this.ispeakTagModal = ispeakTagModal;
    }
    async createOneTag(name, bgColor = '#DB2828', other) {
        return this.ispeakTagModal.create({
            name,
            bgColor,
            ...other,
        });
    }
    async findOneTag(options) {
        return this.ispeakTagModal.findOne(options).exec();
    }
    async getTagList(options) {
        return this.ispeakTagModal.find(options).sort({ orderNo: 1 }).limit(100000);
    }
    async findIspeakTagByPage(page = 1, limit = 10, findOption = {}) {
        const query = [];
        Object.keys(findOption).forEach((item) => {
            if (!findOption[item])
                return;
            if (item === 'user') {
                const obj = {};
                obj[item] = findOption[item]
                    ? new mongoose.Types.ObjectId(findOption[item])
                    : new RegExp('', 'i');
                query.push(obj);
            }
            else {
                const obj = {};
                obj[item] = {
                    $regex: findOption[item] ? new RegExp(findOption[item], 'i') : new RegExp('', 'i'),
                };
                query.push(obj);
            }
        });
        const match = {};
        if (query.length) {
            match['$and'] = query;
        }
        return this.ispeakTagModal.aggregate([
            {
                $match: match,
            },
            {
                $lookup: {
                    from: model_name_1.UserModelName.User,
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $project: {
                    bgColor: 1,
                    createdAt: 1,
                    name: 1,
                    orderNo: 1,
                    description: 1,
                    'user.userName': 1,
                    'user.nickName': 1,
                    'user.link': 1,
                    'user._id': 1,
                },
            },
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    items: [{ $skip: (page - 1) * limit }, { $sort: { orderNo: 1 } }, { $limit: limit }],
                },
            },
        ]);
    }
    async findOneIspeakTagUpdate(findOptions, updateOptions) {
        return this.ispeakTagModal.updateOne(findOptions, updateOptions).exec();
    }
};
IspeakTagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.ISpeakModelName.ISpeakTagList)),
    __metadata("design:paramtypes", [mongoose.Model])
], IspeakTagService);
exports.IspeakTagService = IspeakTagService;
//# sourceMappingURL=ispeakTag.service.js.map