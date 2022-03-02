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
exports.IspeakService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const model_name_1 = require("../../../constant/model-name");
let IspeakService = class IspeakService {
    IspeakModel;
    constructor(IspeakModel) {
        this.IspeakModel = IspeakModel;
    }
    async getSpeakByPage(page = 1, limit = 10, findOption = {}) {
        const query = [];
        const queryType = [];
        Object.keys(findOption).forEach((item) => {
            if (!findOption[item])
                return;
            if (item === 'author' || item === 'tag') {
                const obj = {};
                obj[item] = findOption[item]
                    ? new mongoose.Types.ObjectId(findOption[item])
                    : new RegExp('', 'i');
                query.push(obj);
            }
            else if (item === 'type') {
                if (!Array.isArray(findOption[item])) {
                    findOption[item] = [findOption[item]];
                }
                findOption[item].forEach((value) => {
                    const obj = {};
                    obj['type'] = {
                        $regex: value ? new RegExp(value, 'i') : new RegExp('', 'i'),
                    };
                    queryType.push(obj);
                });
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
        if (queryType.length) {
            match['$or'] = queryType;
        }
        return this.IspeakModel.aggregate([
            {
                $match: match,
            },
            {
                $lookup: {
                    from: model_name_1.ISpeakModelName.ISpeakTagList,
                    localField: 'tag',
                    foreignField: '_id',
                    as: 'tag',
                },
            },
            {
                $lookup: {
                    from: model_name_1.UserModelName.User,
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author',
                },
            },
            {
                $project: {
                    _id: 1,
                    updatedAt: 1,
                    createdAt: 1,
                    type: 1,
                    content: 1,
                    title: 1,
                    tag: 1,
                    author: 1,
                    showComment: 1,
                },
            },
            {
                $facet: {
                    total: [{ $count: 'total' }],
                    items: [{ $sort: { createdAt: -1 } }, { $skip: (page - 1) * limit }, { $limit: limit }],
                },
            },
        ]);
    }
    async addOneSpeak(createOption) {
        return this.IspeakModel.create(createOption);
    }
    async findOneAndUpdate(findOptions, updateOptions) {
        return this.IspeakModel.updateOne(findOptions, updateOptions).exec();
    }
    async findOneAndDelete(findOptions) {
        return this.IspeakModel.findOneAndRemove(findOptions);
    }
    async findOne(findOption) {
        return this.IspeakModel.find(findOption);
    }
};
IspeakService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_name_1.ISpeakModelName.ISpeakList)),
    __metadata("design:paramtypes", [mongoose.Model])
], IspeakService);
exports.IspeakService = IspeakService;
//# sourceMappingURL=ispeak.service.js.map