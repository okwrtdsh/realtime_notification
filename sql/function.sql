CREATE OR REPLACE FUNCTION notify_trigger()
  RETURNS trigger AS
$BODY$
DECLARE
BEGIN
  PERFORM pg_notify('listen_notification', TG_TABLE_NAME || ',id,' || NEW.id );
  RETURN new;
END;
$BODY$
  LANGUAGE plpgsql;
