import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class ConvertService {
  async parseCsv(
    file: Iterable<any> | AsyncIterable<any>,
    separator: string = ';',
  ): Promise<any[]> {
    const results = [];
    let headers: unknown[] = null;

    await new Promise((resolve, reject) => {
      Readable.from(file).pipe(
        csv({ separator, headers: true })
          .on('data', (data) => {
            const values = Object.values(data);
            if (!headers) {
              headers = values;

              return;
            }

            results.push(
              Object.fromEntries(
                headers.map((header, idx) => [header, values[idx]]),
              ),
            );
          })
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error)),
      );
    });

    return results;
  }
}
