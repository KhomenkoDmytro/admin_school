import { Controller, Get } from "@nestjs/common";
import { AwsSesService } from "./aws-ses.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("aws-ses")
export class AwsSesController {
  constructor(private readonly awsSesService: AwsSesService) {}

  @ApiOperation({ summary: "get send statistic" })
  @Get("getSendStatistic")
  getStatistic() {
    return this.awsSesService.sendMail();
  }
}
