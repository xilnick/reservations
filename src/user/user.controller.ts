import { Controller, Get, Param } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private reservationService: ReservationService) {}

  @Public()
  @Get(':id/reservations-by-day')
  async getUserReservationsDayGrouped(@Param('id') id: number) {
    const reservations = await this.reservationService.findUserReservations(id);

    return reservations.reduce((acc, reservation) => {
      const day = reservation.startTime.toDateString();
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(reservation);
      return acc;
    }, {});
  }
}
