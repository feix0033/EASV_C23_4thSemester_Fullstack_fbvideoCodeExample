/**
 * This is the DTO which is data transform object to deal with the data from database as Json file to angular object.
 */
export interface MessageDTO {
  messageContent:string,
  timestamp: Date;
  user: string;
}
