import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationWithAmenityDTO } from './reservationWithAmenity.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('')
  async getReservationsWithAmenityByTime(
    @Query('amenityId') amenityId: number,
    @Query('timestamp') timestamp: number,
  ) {
    return (
      await this.reservationService.getReservationsWithAmenity(
        amenityId,
        timestamp,
      )
    ).map((reservation) =>
      ReservationWithAmenityDTO.fromReservation(reservation),
    );
  }
}
