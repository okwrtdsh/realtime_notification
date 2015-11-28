CREATE TRIGGER staff_schedule_trigger
  AFTER INSERT OR UPDATE OR DELETE
  ON staff_schedule
  FOR EACH ROW
  EXECUTE PROCEDURE notify_trigger();
