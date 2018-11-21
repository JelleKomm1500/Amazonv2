using System.Linq;

namespace Models
{
    public class BoatDump : BoatTask
    {
        Point point;
        public BoatDump(Point point)
        {
            this.point = point;
        }
        public void StartTask(Boat t)
        {
            if (1 == 1)
            {
                var i = 0;
            }
        }

        public bool TaskComplete(Boat t)
        {
            // "Dumpt" de rekjes naar een gewenst punt todat de boat 0 rekjes bevat
            return true;
        }
    }
}