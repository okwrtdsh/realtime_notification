create view staff_attend_days as
select staff_id as id, count(*) as total from staff_schedule
group by staff_id;
