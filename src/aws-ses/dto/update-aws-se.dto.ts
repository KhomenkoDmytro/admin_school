import { PartialType } from '@nestjs/swagger';
import { CreateAwssDto } from './create-aws-se.dto';

export class UpdateAwssDto extends PartialType(CreateAwssDto) {}
