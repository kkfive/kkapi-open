import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ISpeakModelName } from 'src/constant/model-name';
import { UserModule } from '../users/user.module';
import { IspeakController } from './controller/ispeak.controller';
import { IspeakTagController } from './controller/ispeakTag.controller';
import { IspeakTag, IspeakTagSchema } from './schema/ipseakTag.schema';
import { Ispeak, IspeakSchema } from './schema/ispeak.schema';
import { IspeakService } from './service/ispeak.service';
import { IspeakTagService } from './service/ispeakTag.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: ISpeakModelName.ISpeakList,
        schema: IspeakSchema,
        collection: ISpeakModelName.ISpeakList,
      },
      {
        name: ISpeakModelName.ISpeakTagList,
        schema: IspeakTagSchema,
        collection: ISpeakModelName.ISpeakTagList,
      },
    ]),
  ],

  controllers: [IspeakController, IspeakTagController],
  providers: [IspeakService, IspeakTagService],
  exports: [IspeakService, IspeakTagService],
})
export class IspeakModule {}
