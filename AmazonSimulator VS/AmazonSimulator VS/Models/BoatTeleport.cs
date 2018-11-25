namespace Models
{
    public class BoatTeleport : BoatTask
    {
        private Point point;

        public BoatTeleport(Point point)
        {
            this.point = point;
        }

        /// <summary>
        /// Method to set the moving point used for the boat
        /// </summary>
        /// <param name="t"></param>
        public void StartTask(Boat t)
        {
            t.Move(point.x, point.y, point.z);
        }

        /// <summary>
        /// Method to move the boat to the specified point
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool TaskComplete(Boat t)
        {
            return t.x == point.x && t.y == point.y && t.z == point.z;
        }
    }
}