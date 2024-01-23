import usePartySocket from "partysocket/react";
import { useEffect } from "react";

export const usePartySocketAcrossRooms = (
  HOST: string,
  id: string | undefined,
  room: string | undefined,
  party?: string | undefined,
) => {
  const socket = usePartySocket({
    host: HOST,
    startClosed: true,
    party: party,
    onMessage(event: MessageEvent<string>) {
      console.log(event.data);
    },
  });

  useEffect(() => {
    if (room !== undefined && id !== undefined) {
      if (socket.room !== room || socket.id !== id) {
        console.log(
          `Will updateProperties, current: { id: ${socket.id}, room: ${socket.room} }`,
        );
        // BUG: Looks like this kills the party
        socket.updateProperties({ room: room, id: id });
        // This is what works:
        // socket.updateProperties({ room: room, id: id, party: party });
        console.log(`Connecting to: { id: ${id}, room: ${room}`);
        socket.reconnect();
      }
    } else {
      console.log(`Missing id/room, closing socket { id: ${id}, room: ${room}`);
      socket.close();
    }
  }, [socket, room, id]);

  return socket;
};
