namespace Models
{
    public class RobotDropOff : RobotTask
    {
        Boat boat;
        Point point;

        /// <summary>
        /// Method to make the robot drop the barrel at the boat
        /// </summary>
        /// <param name="t"></param>
        public RobotDropOff(Boat t)
        {
            boat = t;
            point = null;
        }

        /// <summary>
        /// Method to make the robot drop the barrel at a point
        /// </summary>
        /// <param name="p"></param>
        public RobotDropOff(Point p)
        {
            boat = null;
            point = p;
        }

        /// <summary>
        /// Method to check if the boat is loadable or not, and removes or loads barrels if needed
        /// </summary>
        /// <param name="r"></param>
        public void StartTask(Robot r)
        {
            if (boat != null && boat.loadable)
            {
                r.RemoveBarrel(boat);
            }
            else if (point != null)
            {
                r.RemoveBarrel(point);
            }
        }

        /// <summary>
        /// Unloads the robot contents
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public bool TaskComplete(Robot r)
        {
            return r.barrel == null;
        }
    }
}