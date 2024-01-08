import { Reservation } from './reservation.entity';
import moment from 'moment/moment';

export class ReservationWithAmenityDTO {
  reservationId: number;
  userId: number;
  startTime: string;
  duration: number;
  amenityName: string;

  public static fromReservation(
    reservation: Reservation,
  ): ReservationWithAmenityDTO {
    const dto = new ReservationWithAmenityDTO();

    dto.reservationId = reservation.id;
    dto.userId = reservation.userId;
    dto.startTime = moment(reservation.startTime).format('HH:mm');
    dto.duration = moment(reservation.endTime).diff(
      reservation.startTime,
      'minutes',
    );
    dto.amenityName = reservation.amenity.name;

    return dto;
  }
}
