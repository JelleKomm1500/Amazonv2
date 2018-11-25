using System.Linq;

namespace Models
{
    public class BoatDump : BoatTask
    {
        Point point;

        /// <summary>
        /// Method to set the dumping location of the boat
        /// </summary>
        /// <param name="point"></param>
        public BoatDump(Point point)
        {
            this.point = point;
        }

        /// <summary>
        /// Method to start unloading/dumping the boat contents
        /// </summary>
        /// <param name="t"></param>
        public void StartTask(Boat t)
        {
            if (point.barrel == null)
            {
                t.RemoveBarrel(point);
            }
        }

        /// <summary>
        /// Unloads the boat contents until the contents are 0
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool TaskComplete(Boat t)
        {
            return !t.barrels.Any();
        }
    }
}