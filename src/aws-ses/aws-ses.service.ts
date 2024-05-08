import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { readFile } from "fs/promises";
import { join } from "path";

@Injectable()
export class AwsSesService {
  private readonly ses: AWS.SES;

  constructor() {
    Logger.log("initialising AWS Module", "SES SERVICE");

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error(
        "AWS credentials and region must be set as environment variables.",
      );
    }

    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });

    this.ses = new AWS.SES({ apiVersion: "2010-12-01" });
  }

  async sendMail() {
    const templatePath = join(__dirname, '..', 'templates', 'templates', 'emailTemplate.html');
    const htmlBody = await readFile(templatePath, "utf8");
    const params: AWS.SES.SendEmailRequest = {
      Source: "gitlab@vepbit.com",
      Destination: {
        ToAddresses: ["dmytro081102@gmail.com"], // Only the intended recipient
      },
      Message: {
        Subject: {
          Data: `Your OTP code: 111e111`,
        },
        Body: {
          Html: {
            Data: htmlBody,
          },
        },
      },
    };

    try {
      const data = await this.ses.sendEmail(params).promise();
      Logger.log("success[sendMail]:", data);
      return {
        statusCode: HttpStatus.OK,
        message: "Mail Sent",
        data: data,
      };
    } catch (error) {
      Logger.log("error[sendMail]:", error);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Failed to send",
          data: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
