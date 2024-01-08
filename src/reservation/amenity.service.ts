import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './amenity.entity';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  findOne(id: number): Promise<Amenity> {
    return this.amenityRepository.findOneBy({ id });
  }

  addAmenities(amenity: Amenity): Promise<Amenity> {
    return this.amenityRepository.save(amenity);
  }
}
