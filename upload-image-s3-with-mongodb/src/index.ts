import { SNSEvent } from 'aws-lambda';

import { container } from './container';

export const handler = async (event: SNSEvent) => {
  const { uploadImageService } = await container();

  const input = JSON.parse(event.Records[0]?.Sns?.Message);

  if (!input?.url) {
    throw Error('Missing url');
  }

  await uploadImageService.execute(input.url);
};
