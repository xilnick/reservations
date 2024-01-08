import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import moment from 'moment';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  addReservations(reservations: Reservation[]): Promise<Reservation[]> {
    return this.reservationRepository.save(reservations);
  }

  async getReservationsWithAmenity(amenityId: number, timestamp: number) {
    const day = moment(timestamp).startOf('day');

    return await this.reservationRepository.find({
      relations: {
        amenity: true,
      },
      where: {
        amenityId: amenityId,
        startTime: And(
          MoreThanOrEqual(day.toDate()),
          LessThan(day.add(1, 'day').toDate()),
        ),
      },
    });
  }
}
