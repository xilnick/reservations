import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity';
import { Reservation } from './reservation.entity';
import { AmenityService } from './amenity.service';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity, Reservation])],
  providers: [AmenityService, ReservationService],
  exports: [AmenityService, ReservationService],
})
export class ReservationModule {}
